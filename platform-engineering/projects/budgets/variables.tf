variable "monthly_limit_usd" {
  description = "月の予算上限(USD)"
  type        = number
  default     = 20
}

variable "alert_email" {
  description = "アラートの通知先メールアドレス"
  type        = string
}


