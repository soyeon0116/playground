export const posts = [
  {
    id: 1,
    title: '첫 번째 글',
    author: 'user',
    content: '프론트엔드 게시판 테스트입니다.',
    comments: [
      { id: 1, author: 'user', text: '좋은 글이네요!' },
      { id: 2, author: 'Guest1', text: '저도 동의합니다.' },
    ],
  },
  {
    id: 2,
    title: '두 번째 글 제목입니다~',
    author: 'Guest2',
    content: '더미데이터로 만든 글입니다.',
    comments: [{ id: 1, author: 'user', text: '재밌게 읽었어요!' }],
  },
  {
    id: 3,
    title: '세 번째 글 일까요오?',
    author: 'Guest1',
    content: '세번째 글글글글',
    comments: [{ id: 1, author: 'user', text: '오~~' }],
  },
];
