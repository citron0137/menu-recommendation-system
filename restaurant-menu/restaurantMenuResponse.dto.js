// 음식점-메뉴 관계 응답 DTO 정의
class RestaurantMenuResponseDTO {
  constructor({ success = true, data = null, message = '', error = '', count = 0, deleted = null }) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.error = error;
    this.count = count;
    this.deleted = deleted;
  }

  // 성공 응답 생성
  static success(data, message = '', count = 0) {
    return new RestaurantMenuResponseDTO({
      success: true,
      data,
      message,
      count
    });
  }

  // 에러 응답 생성
  static error(error, message = '') {
    return new RestaurantMenuResponseDTO({
      success: false,
      error,
      message
    });
  }

  // 삭제 성공 응답 생성
  static deleteSuccess(message, deleted) {
    return new RestaurantMenuResponseDTO({
      success: true,
      message,
      deleted
    });
  }

  // 빈 데이터 응답 생성
  static empty(message = '등록된 음식점-메뉴 관계가 없습니다.') {
    return new RestaurantMenuResponseDTO({
      success: true,
      data: null,
      message
    });
  }
}

export default RestaurantMenuResponseDTO; 