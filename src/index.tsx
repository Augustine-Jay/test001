import React from "react";
import { Button, Typography } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";

const { Title } = Typography;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
`;

const StyledTitle = styled(Title)`
  color: white !important;
  margin-bottom: 2rem !important;
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  height: auto;
  padding: 0.5rem 2rem;
`;

export default function Home() {
  const router = useRouter();

  return <StyledContainer></StyledContainer>;
}
