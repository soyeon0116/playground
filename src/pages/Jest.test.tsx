import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Jest from './Jest';

describe('cal 단위 테스트', () => {
  // 유효성 검사 있지만
  test('필수 입력', async () => {
    render(<Jest />);
    fireEvent.click(screen.getByRole('button', { name: 'Calc' }));
    // 숫자 입력
    expect(await screen.findByTestId('error-a')).toHaveTextContent(
      'a항목은 필수입니다.'
    );
    expect(await screen.findByTestId('error-b')).toHaveTextContent(
      'b항목은 필수입니다.'
    );
    // 연산자 선택
    expect(
      await screen.findByText('연산을 선택해야 합니다.')
    ).toBeInTheDocument();
  });

  test('숫자가 아닌 값은 에러 메세지를 출력한다.', async () => {
    render(<Jest />);
    const inputA = screen.getByRole('textbox', { name: 'A' });
    const inputB = screen.getByRole('textbox', { name: 'B' });
    fireEvent.change(inputA, { target: { value: '1a' } });
    fireEvent.change(inputB, { target: { value: '2b' } });

    fireEvent.click(screen.getByRole('button', { name: 'Calc' }));

    expect(await screen.findByTestId('error-a')).toHaveTextContent(
      '숫자만 입력 가능합니다.'
    );
    expect(await screen.findByTestId('error-b')).toHaveTextContent(
      '숫자만 입력 가능합니다.'
    );
  });

  test('정상 입력과 plus 선택시 정상 동작', async () => {
    render(<Jest />);
    const inputA = screen.getByRole('textbox', { name: 'A' });
    const inputB = screen.getByRole('textbox', { name: 'B' });

    fireEvent.change(inputA, { target: { value: '1' } });
    fireEvent.change(inputB, { target: { value: '2' } });

    fireEvent.click(screen.getByRole('radio', { name: 'plus' }));
    fireEvent.click(screen.getByRole('button', { name: 'Calc' }));

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('Result : 3');
    });
  });

  test('정상 입력과 minus 선택시 정상 동작', async () => {
    render(<Jest />);
    const inputA = screen.getByRole('textbox', { name: 'A' });
    const inputB = screen.getByRole('textbox', { name: 'B' });

    fireEvent.change(inputA, { target: { value: '1' } });
    fireEvent.change(inputB, { target: { value: '2' } });

    fireEvent.click(screen.getByRole('radio', { name: 'minus' }));
    fireEvent.click(screen.getByRole('button', { name: 'Calc' }));

    await waitFor(() => {
      expect(screen.getByTestId('result')).toHaveTextContent('Result : -1');
    });
  });
});
