function solution(A) {
  if (A.length === 1) return 1;
  
  // 중복된 숫자가 있는 경우, 같은 결과가 나와서 Set으로 중복 제거.
  return new Set(A).size;
}