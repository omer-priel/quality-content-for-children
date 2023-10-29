resource "aws_lb" "frontend_application" {
  name               = "frontend-application"
  load_balancer_type = "application"
  internal           = false
  subnets            = [aws_subnet.prod_a.id, aws_subnet.prod_b.id]
  security_groups    = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_target_group" "frontend_application" {
  name        = "frontend-application"
  target_type = "instance"
  vpc_id      = aws_vpc.prod.id
  protocol    = "HTTP"
  port        = 80

  tags = {
    Name = "frontend"
  }

  health_check {
    path                = "/"
    port                = 80
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 10
    timeout             = 60
    interval            = 90
  }
}

resource "aws_lb_listener" "frontend_application" {
  load_balancer_arn = aws_lb.frontend_application.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_application.arn
  }

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb" "frontend_network" {
  name               = "frontend-network"
  load_balancer_type = "network"
  internal           = false
  security_groups    = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }

  subnet_mapping {
    subnet_id     = aws_subnet.prod_a.id
    allocation_id = aws_eip.frontend.id
  }
}

resource "aws_lb_target_group" "frontend_network" {
  name        = "frontend-network"
  target_type = "alb"
  vpc_id      = aws_vpc.prod.id
  protocol    = "TCP"
  port        = 80

  tags = {
    Name = "frontend"
  }
}

resource "aws_lb_target_group_attachment" "frontend_network_http" {
  target_group_arn = aws_lb_target_group.frontend_network.arn
  target_id        = aws_lb.frontend_application.arn
  port             = 80
}
