const ROUTER = {
  HOME: '/',
  BAI_DANG: 'tat-ca-bai-dang',
  HOAT_DONG: {
    ALL: 'tat-ca-hoat-dong',
    DANG_DIEN_RA: 'tat-ca-hoat-dong/dang-dien-ra',
    DA_KET_THUC: 'tat-ca-hoat-dong/da-ket-thuc',
  },
  DETAIL_POST: 'tat-ca-bai-dang/bai-dang/:id',
  DETAIL_EVENT: 'hoat-dong/:id',
  VIEW_DETAIL_POST: 'tat-ca-bai-dang/bai-dang',
  VIEW_DETAIL_EVENT: 'tat-ca-hoat-dong/hoat-dong',
  USER: {
    INFO: 'thong-tin-ca-nhan',
  },
  ADMIN: {
    QUAN_LY_USER: 'quan-ly-doan-vien',
    CAP_TAI_KHOAN: 'dang-ky',
  },
};

export default ROUTER;
