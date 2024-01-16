"use client";

import { isNotEmpty, useForm } from "@mantine/form";
import { MOCKUP_ACHIEVEMENT } from "@/mockups/achievement";
import AchievementForm, {
  AchievementFormInput,
} from "@/components/pages/achievement/AchievementForm";
import { TitleRow } from "@/components/common/rows";

function AchievementEditSection() {
  const data = MOCKUP_ACHIEVEMENT;
  /**
   * @TODO: GET API 연결
   */

  const transformedAchievement = {
    ...data,
    publicationDate: new Date(data.publicationDate),
    ISSN1: data.ISSN.slice(0, 4),
    ISSN2: data.ISSN.slice(-4),
  };

  const form = useForm<AchievementFormInput>({
    initialValues: transformedAchievement,
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
    /**
     * @TODO: PUT/PATCH API 연결
     */
    const body = { ...input, ISSN: input.ISSN1 + input.ISSN2 };
    console.log(body);
  };

  return (
    <>
      <TitleRow title="연구실적 상세보기" />
      <AchievementForm form={form} handleSubmit={handleSubmit} isEdit />
    </>
  );
}

export default AchievementEditSection;
