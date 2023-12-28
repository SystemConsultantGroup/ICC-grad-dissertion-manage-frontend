"use client";

import { MantineTheme, MantineThemeComponent, createTheme } from "@mantine/core";
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
  } satisfies MantineThemeComponents,
});

type MantineThemeComponents = Record<
  string,
  // 왜 styles: any라고 돼있을까요
  Omit<MantineThemeComponent, "styles"> & { styles: Interpolation<MantineTheme> }
>;
