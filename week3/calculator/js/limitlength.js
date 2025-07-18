// 11 자리수 여부 check 함수
export const limitlength = (result) => {
   // 정수부가 11자리 이상이면 Error
   if (!String(result).includes('.') && String(result).length > 11) {
      return 'Error';
   }

   // 소수점 존재할 때, 정수 + 소수 길이 합이 11을 넘으면 소수점 아래 부분 자르기
   if (String(result).includes('.')) {
      // result를 정수부분과 소수부분으로 나누기
      const [intResult, decResult] = String(result).split('.');

      // 정수부 > 11 이면 Error
      if (intResult.length > 11) return 'Error';

      // 정수 + 소수점 + 소수 > 11 이면
      if (String(result).length > 11) {
         // 소수 부분을 11자리수에 맞춰서 자르기
         return intResult + '.' + decResult.slice(0, 11 - intResult.length - 1)
      }

      return intResult + '.' + decResult;
   }

   // 11자리 이하면 그대로
   return String(result);
}