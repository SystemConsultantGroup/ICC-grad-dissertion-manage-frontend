"use client";

import { isNotEmpty, useForm } from "@mantine/form";
import AchievementForm, {
  AchievementFormInput,
} from "@/components/pages/achievement/AchievementForm";
import { TitleRow } from "@/components/common/rows";

function AchievementRegisterSection() {
  const form = useForm<AchievementFormInput>({
    validate: {
      performance: isNotEmpty("논문 실적 구분을 입력하세요."),
      paperTitle: isNotEmpty("논문/특허 제목을 입력하세요."),
      journalName: isNotEmpty("학술지명/학술대회명을 입력하세요."),
      publicationDate: isNotEmpty("게재년월을 입력하세요."),
      authorType: isNotEmpty("주저자 여부를 입력하세요."),
      authorNumbers: isNotEmpty("저자 수를 입력하세요."),
    },
  });

  const handleSubmit = (input: AchievementFormInput) => {
    console.log(input);
  };

  return (
    <>
      <TitleRow title="연구실적 등록" />
      <AchievementForm form={form} handleSubmit={handleSubmit} />
    </>
  );
}

export default AchievementRegisterSection;
