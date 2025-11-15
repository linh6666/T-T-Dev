'use client';
import Link from "next/link";
import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './NotFoundTitle.module.css';

export function NotFoundTitle() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
    <Title className={classes.title}>Website đang được cập nhật</Title>
<Text c="dimmed" size="lg" ta="center" className={classes.description}>
  Xin lỗi, hiện tại trang website này đang trong quá trình cập nhật. Vui lòng quay lại sau.
</Text>
      <Group justify="center">
   <Button
  component={Link}
  href="/"
  variant="subtle"
  size="md"
  styles={{
    root: {
      color: "#762f0b",
      "&:hover": {
        backgroundColor: "rgba(118, 47, 11, 0.1)",
      },
    },
  }}
>
  Quay lại trang chủ !
</Button>
      </Group>
    </Container>
  );
}