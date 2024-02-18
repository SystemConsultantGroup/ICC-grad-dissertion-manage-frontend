"use client";

import {
  createTheme,
  CSSVariablesResolver,
  MantineThemeComponent,
  MantineTheme,
} from "@mantine/core";
import { Interpolation } from "@emotion/react";
import { Pretendard } from "./typography/fonts";

export const AppTheme = createTheme({
  fontFamily: `${Pretendard.fontFamily}, sans-sarif`,
  black: "#333",
  headings: {
    fontFamily: "inherit",
  },

  // lineHeight: 1 // no such

  lineHeights: {
    xs: "1",
    sm: "1",
    md: "1",
    lg: "1",
    xl: "1",
  },

  other: {
    fontWeights: {
      regular: 400,
      bold: 700,
    },
  },

  components: {
    Input: {
      styles: (theme) => ({
        input: {
          borderColor: theme.colors.blue[5],
        },
      }),
    },
    InputWrapper: {
      styles: {
        label: {
          marginBottom: 8,
        },
      },
    },
    TextInput: {
      styles: {
        root: {
          width: 300,
        },
      },
    },
    PasswordInput: {
      styles: {
        root: {
          width: 300,
        },
      },
    },
    FileInput: {
      styles: {
        root: {
          width: 300,
        },
      },
    },
    Card: {
      defaultProps: { radius: "lg" },
      styles: {
        root: {
          border: "1px solid var(--mantine-color-dimmed-border)",
        },
      },
    },
    Badge: {
      styles: {
        root: {
          // Badge 글자가 약간 위쪽으로 올라가는 문제 해결
          // 사실 근본적인 이유가 있을 텐데 무엇인지 알 수가 없었습니다...
          lineHeight: "unset",
        },
      },
    },
  } satisfies MantineThemeComponents,
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-other-font-weights-regular": theme.other.fontWeights.regular,
    "--mantine-other-font-weights-bold": theme.other.fontWeights.bold,
  },
  dark: {
    "--mantine-color-main-background": theme.colors.gray[7],
    "--mantine-color-dimmed-border": theme.colors.gray[9],
  },
  light: {
    "--mantine-color-main-background": "#FAFAFA",
    "--mantine-color-dimmed-border": theme.colors.gray[1],
  },
});

type MantineThemeComponents = Record<
  string,
  // 왜 styles: any라고 돼있을까요
  Omit<MantineThemeComponent, "styles"> & { styles: Interpolation<MantineTheme> }
>;
