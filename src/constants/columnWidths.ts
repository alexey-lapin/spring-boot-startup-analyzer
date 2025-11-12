export const columnWidthClasses = {
  id: 'w-[6%] min-w-[4.5rem] max-w-[6%]',
  parentId: 'w-[6%] min-w-[4.5rem] max-w-[6%]',
  step: 'w-[22%] min-w-[18rem] max-w-[22%]',
  duration: 'w-[8%] min-w-[6rem] max-w-[8%]',
  self: 'w-[8%] min-w-[6rem] max-w-[8%]',
  tags: 'w-[40%] min-w-[12rem] max-w-[40%]',
} as const

export type ColumnWidthKey = keyof typeof columnWidthClasses

export const getColumnWidthClass = (key: ColumnWidthKey) => columnWidthClasses[key]
