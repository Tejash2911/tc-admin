export interface PagePropsI {
  params: Promise<{ id: string }>
  searchParams: { [key: string]: string | string[] | undefined }
}
