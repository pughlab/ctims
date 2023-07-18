import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IdleComponent from "../components/IdleComponent";
import useIdle, { IdleState } from "../hooks/useIdle";
import useRefreshToken from "../hooks/useRefreshToken";
import { useRouter } from 'next/router';
import '@testing-library/jest-dom/extend-expect';


jest.mock('../hooks/useIdle', () => ({
  __esModule: true,
  default: jest.fn(),
  IdleState: {
    Idle: 'idle',
    Active: 'active'
  }
}));

jest.mock('../hooks/useRefreshToken', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    error: null,
    response: null,
    loading: false,
    refreshTokenOperation: jest.fn(),
  }),
}));


jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.useFakeTimers();

describe('<IdleComponent />', () => {
  it('should show dialog when idle', () => {
    useIdle.mockReturnValue({
      state: IdleState.Idle
    });
    render(<IdleComponent />);
    expect(screen.queryByText('Idle Warning')).toBeInTheDocument();
  });

  it('should hide dialog when not idle', () => {
    useIdle.mockReturnValue({
      state: IdleState.Active
    });
    render(<IdleComponent />);
    expect(screen.queryByText('Idle Warning')).not.toBeInTheDocument();
  });

  it('should refresh token when not idle', () => {
    const refreshTokenOperation = jest.fn();
    useIdle.mockReturnValue({
      state: IdleState.Active
    });
    useRefreshToken.mockReturnValue({
      refreshTokenOperation,
    });
    render(<IdleComponent />);
    expect(refreshTokenOperation).toHaveBeenCalled();
  });

  it('should redirect to home and remove token when timeout reaches 0', () => {
    useIdle.mockReturnValue({
      state: IdleState.Idle,
    });
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    render(<IdleComponent />);
    act(() => {
      jest.advanceTimersByTime(60000); // Simulate passage of 1 minute
    });
    expect(useRouter().push).toHaveBeenCalledWith('/');
    expect(removeItemSpy).toHaveBeenCalledWith('ctims-accessToken');
  });
});
