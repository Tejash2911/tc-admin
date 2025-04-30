import { GetDataI } from '@/types/api-payload-types'

export const getCommonParams = (nParams: any = {}): GetDataI => {
  try {
    const params: GetDataI = {
      isPagination: nParams?.isPagination ?? true
    }

    if (params.isPagination && nParams.limit != 0) {
      params['limit'] = nParams.limit
    }

    if (params.isPagination && nParams.offset != 0) {
      params['offset'] = nParams.offset
    }

    if (nParams.search) {
      params['search'] = nParams.search
    }

    if (nParams.sort) {
      params['sort'] = nParams.sort
    }

    if (nParams.category) {
      params['category'] = nParams.category
    }

    if (nParams.status) {
      params['status'] = nParams.status
    }

    return params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      isPagination: nParams?.isPagination ?? true
    }
  }
}
