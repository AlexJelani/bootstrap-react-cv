
resource "aws_lambda_function" "hitcounter" {
  filename      = "${path.module}/lambda/func.zip"
  function_name = "myfunction"
  role          = aws_iam_role.lambda_exec_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.12"
  memory_size   = 128
  timeout       = 3

  environment {
    variables = {
      ENV_VAR_KEY = "value"
    }
  }

  tracing_config {
    mode = "Active"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_policy"
  description = "Policy for Lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "logs:*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = [
          "dynamodb:GetItem",
          "dynamodb:PutItem"
        ]
        Resource = "arn:aws:dynamodb:us-west-2:123456789012:table/HitCounter"
      },
      {
        Effect   = "Allow"
        Action   = "lambda:*"
        Resource = "*"
      },
      {
        Effect   = "Allow"
        Action   = "cloudwatch:GetInsightRuleReport"
        Resource = "arn:aws:cloudwatch:*:*:insight-rule/DynamoDBContributorInsights*"
      },
      {
        Effect    = "Allow"
        Action    = "iam:CreateServiceLinkedRole"
        Resource  = "*"
        Condition = {
          StringEquals = {
            "iam:AWSServiceName" = [
              "replication.dynamodb.amazonaws.com",
              "dax.amazonaws.com",
              "dynamodb.application-autoscaling.amazonaws.com",
              "contributorinsights.dynamodb.amazonaws.com",
              "kinesisreplication.dynamodb.amazonaws.com"
            ]
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}
data "archive_file" "func" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/"  # Replace with the directory containing your code
  output_path = "${path.module}/lambda/func.zip"
}

# Terraform Configuration for AWS API Gateway and Integration

# Define an HTTP API in API Gateway for cloud resume function

# Configure an integration with AWS Lambda for the API

# Define a route in the API to connect to the Lambda integration
# Grant necessary permissions for API Gateway to invoke the Lambda function
# Define a stage for the API to automatically deploy changes
