# weather-app
Weather app assignment from Random Software

## How to run the application
- Go into both backend and frontend folders and run `npm install`
- Then go to backend folder and run the command `npm run start` to run the backend app
- After that run `ng serve` to run the Angular app

## Code improvements
### Backend
- Implement reusable response service to send responses from the server
- Implement proper error handling for socket connections and connection retry when fail to to connect or connection got disconnected abruptly.
- Notify frontend when socket connection fails.
- Implement global error handler for unexpected errors.
- Add unit tests and Joi validations.
### Frontend
- Handle socket connection errors and display proper error messages
- Connection retry when socket connection fails
- Add global styles that apply for all the pages
- Add types without using any type
- Add bad request page
- Implement global error handler and add unit tests

## Deployment
### Frontend
- Use S3 bucket with static web hosting enabled
- Create a CloudFront distribution and point it to S3 bucket to enable CDN caching and improve performance.

### Backend
- For user authentication we can use Amazon Cognito Pool or AWS Amplify.
- For code deployment we have multiple options.
#### Using AWS Lambda and API Gateway
- For this we can use Web Socket API Gateway, Cognito User Pool with Custom Lamda Authorizer and Lambda functions for web socket apis.
- We need to implement seperate lambda functions for the WebSocket routes (e.g., $connect, $disconnect, and other custom routes).
- This option would be esy to setup and maintain because it is serverless.
#### Using EC2
- Setup an EC2 instance. SSH into the instance and install Node.js and other dependencies.
- Create an Auto Scaling group to handle traffic spikes.
- Set up an Application Load Balancer to distribute incoming traffic across multiple instances.
- Configure the ALB to support WebSocket connections by enabling sticky sessions.
- This would be inconvenient compared to using lambda.
#### Other tools and configurations
- We can use Amazon DynamoDB as the database(Or MongoDB Atlas Cloud deployed in Amazon Cloud)
- Use AWS CodePipeline to automate the deployment process.
- Use CloudWatch to monitor application performance and set up alerts.(Can define policies based on metrics if we use EC2)
- Store sensitive information such as secrets(JWT_SECRET) and database credentials in AWS Secrets Manager.
- Use Route 53 to manage domain and DNS settings.
- Use proper IAM roles, Security Groups, Network ACLs for better security and have resources in multiple availability zones for better availability.
