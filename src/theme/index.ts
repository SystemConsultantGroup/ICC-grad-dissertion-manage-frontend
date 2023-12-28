"use client";

import { createTheme, CSSVariablesResolver, MantineTheme } from "@mantine/core";
import { Interpolation } from "@emotion/react";
import { Pretendard } from "./typography/fonts";

export const AppTheme = createTheme({
  fontFamily: `${Pretendard.fontFamily}, sans-sarif`,
  black: "#333",
  headings: {
    fontFamily: "inherit",
  },
  // lineHeight: 1 // no such

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
  } satisfies MantineThemeComponents,
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-other-font-weights-regular": theme.other.fontWeights.regular,
    "--mantine-other-font-weights-bold": theme.other.fontWeights.bold,
  },
  dark: {},
  light: {},
});

type MantineThemeComponents = Record<
  string,
  // 왜 styles: any라고 돼있을까요
  /* MantineThemeComponent & */ { styles: Interpolation<MantineTheme> }
>;
