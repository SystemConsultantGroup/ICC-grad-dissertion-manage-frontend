type TArg = { pageSize: number; pageNumber: number; arrayLength: number };

/**
 *
 * @description 목록 형식 뷰에서 N 개씩 보기를 선택했을 때 몇 번째에서 몇 번째까지 보여주고 있는지 알려주는 함수
 * @param { pageSize: number, pageNumber: number, arrayLength: number }
 * @returns  { startNumber: number, endNumber: number }
 */

export function getPageSizeStartEndNumber({ pageSize, pageNumber, arrayLength }: TArg) {
  if (!pageSize || !pageNumber || !arrayLength) return { startNumber: 0, endNumber: 0 };

  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const startNumber = startIndex + 1; // 여기 번째 에서
  const endNumber = endIndex > arrayLength ? arrayLength : endIndex; // 여기 번째 까지

  return { startNumber, endNumber };
}
