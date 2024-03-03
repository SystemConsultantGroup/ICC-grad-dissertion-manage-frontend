import { Title, TitleProps } from "@mantine/core";

interface Props extends TitleProps {
  component?: unknown;
}

function SectionTitle({ children, ...props }: Props) {
  return (
    <Title order={2} fz={28} fw="bold" {...props}>
      {children}
    </Title>
  );
}

export default SectionTitle;
