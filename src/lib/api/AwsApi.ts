import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBStreamsClient } from "@aws-sdk/client-dynamodb-streams";
import { S3Client } from "@aws-sdk/client-s3";
import { ApiResponse, IApi } from "yuni-chanz-react";
import IAwsApiConfig from "./IAwsApiConfig";

export default abstract class AwsApi<T = any> implements IApi<T> {

    readonly dynamoDB: DynamoDBClient;

    /**
     * TODO: Quite unsure how to implement this one like how Firestore does.
     * Will implement IStreamableDataApi and IStreamableQueryApi when I need for any of my projects.
     */
    readonly dynamoDBStreams: DynamoDBStreamsClient;

    readonly s3: S3Client;

    readonly cognitoIdentity: CognitoIdentityClient;

    
    constructor(config: IAwsApiConfig) {
        this.dynamoDB = new DynamoDBClient(config.dynamoDB ?? {});
        this.dynamoDBStreams = new DynamoDBStreamsClient(config.dynamoDBStreams ?? {});
        this.s3 = new S3Client(config.s3 ?? {});
        this.cognitoIdentity = new CognitoIdentityClient(config.cognitoIdentity ?? {});
    }

    abstract request(): Promise<ApiResponse<T>>;
}