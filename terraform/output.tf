output "app_ip" {
  value = " http://${aws_instance.app_server.public_ip}" 
}