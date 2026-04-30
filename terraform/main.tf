resource "aws_security_group" "app_sg" {
    name = "app_sg"

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 5000
        to_port     = 5000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    # Allow all outbound
    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    }

resource "aws_instance" "app_server" {
    ami           = "ami-0ec10929233384c7f"
    instance_type = "t3.micro"

    security_groups = [aws_security_group.app_sg.name]
    
    user_data = <<-EOF
                #!/bin/bash
                apt update -y
                apt install docker.io -y
                systemctl start docker
                systemctl enable docker
                usermod -aG docker ubuntu
                EOF

    tags = {
        Name = "FoodExpress"
    }
}
