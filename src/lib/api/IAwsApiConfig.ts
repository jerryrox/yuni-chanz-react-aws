import { CognitoIdentityClientConfig } from "@aws-sdk/client-cognito-identity";
import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBStreamsClientConfig } from "@aws-sdk/client-dynamodb-streams";
import { S3ClientConfig } from "@aws-sdk/client-s3";

interface IAwsApiConfig {
    dynamoDB?: DynamoDBClientConfig;
    dynamoDBStreams?: DynamoDBStreamsClientConfig;
    s3?: S3ClientConfig;
    cognitoIdentity?: CognitoIdentityClientConfig;
}
export default IAwsApiConfig;