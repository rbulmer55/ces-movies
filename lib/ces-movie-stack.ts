import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as nodeLambda from "aws-cdk-lib/aws-lambda-nodejs";
import * as event from "aws-cdk-lib/aws-lambda-event-sources";
import * as path from "path";

export class CesMovieStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const myBucket = new s3.Bucket(this, "myBucket", {});

    // myBucket.bucketName
    const saveMoviesLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, "saveMoviesLambda", {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(__dirname, "src/handlers/save-movies/save-movies.ts"),
        memorySize: 1024,
        handler: "handler",
        bundling: {
          minify: true,
          externalModules: ["aws-sdk"],
        },
        environment: {
          BUCKET_NAME: myBucket.bucketName,
        },
      });

    const eventSource = new event.S3EventSource(myBucket, {
      events: [s3.EventType.OBJECT_CREATED_PUT],
    });
  }
}
