terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket        = "ino8ban4-tfstate-20261005"
    key           = "budgets/terraform.tfstate"
    region        = "ap-northeast-1"
    encrypt       = true
    use_lockfile  = true
  }
}


provider "aws" {
  region = "ap-northeast-1"
}

resource "aws_budgets_budget" "monthly" {
  name         = "monthly-cost"
  budget_type  = "COST" 
  limit_amount = var.monthly_limit_usd
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator = "GREATER_THAN"
    threshold = 80
    threshold_type = "PERCENTAGE"
    notification_type = "ACTUAL"
    subscriber_email_addresses = [var.alert_email]
  }

  notification {
    comparison_operator = "GREATER_THAN"
    threshold = 100
    threshold_type = "PERCENTAGE"
    notification_type = "FORECASTED"
    subscriber_email_addresses = [var.alert_email]
  }
}


