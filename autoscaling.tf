resource "aws_network_interface" "frontend" {
  subnet_id       = aws_subnet.prod_1.id
  private_ips     = ["10.0.1.50", "10.0.1.51", "10.0.1.52", "10.0.1.53", "10.0.1.54", "10.0.1.55", "10.0.1.56"]
  security_groups = [aws_security_group.frontend.id]

  tags = {
    Name = "frontend"
  }
}

resource "aws_launch_template" "frontend" {
  name          = "frontend"
  image_id      = "ami-0fb820135757d28fd"
  instance_type = "t2.micro"

  tags = {
    Name = "frontend"
  }
}

resource "aws_autoscaling_group" "frontend_blue" {
  name = "frontend_blue"

  vpc_zone_identifier = [aws_subnet.prod_1.id, aws_subnet.prod_2.id]
  target_group_arns   = [aws_lb_target_group.frontend.arn]

  force_delete = true

  desired_capacity = 2
  min_size         = 2
  max_size         = 2

  tag {
    key                 = "Name"
    value               = "frontend"
    propagate_at_launch = true
  }

  launch_template {
    id      = aws_launch_template.frontend.id
    version = "$Latest"
  }
}

resource "aws_autoscaling_group" "frontend_green" {
  name = "frontend_green"

  vpc_zone_identifier = [aws_subnet.prod_1.id, aws_subnet.prod_2.id]
  target_group_arns   = [aws_lb_target_group.frontend.arn]

  force_delete = true

  desired_capacity = 2
  min_size         = 2
  max_size         = 2

  tag {
    key                 = "Name"
    value               = "frontend"
    propagate_at_launch = true
  }

  launch_template {
    id      = aws_launch_template.frontend.id
    version = "$Latest"
  }
}
