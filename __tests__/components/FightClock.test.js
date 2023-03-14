import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import FightClock from '../../src/components/FightClock';

/*
See TESTING.MD
*/

// ignore useNativeDriver warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// all timeouts must be less than this timeout
jest.setTimeout(30000);

test('rest1, ready1, interval1', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={1} restLength={5} roundLength={5} readyLength={5} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Ready Time Left: 0:04')).toBeTruthy());
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy(), { timeout: 6000 });
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 11000 });
});

test('rest2, ready1, interval1', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={1} restLength={0} roundLength={5} readyLength={5} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Ready Time Left: 0:04')).toBeTruthy());
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy(), { timeout: 6000 });
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 11000 });
});

test('rest1, ready2, interval1', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={1} restLength={5} roundLength={5} readyLength={0} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy());
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 6000 });
});

test('rest2, ready2, interval1', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={1} restLength={0} roundLength={5} readyLength={0} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy());
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 6000 });
});

test('rest1, ready1, interval2', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={2} restLength={5} roundLength={5} readyLength={5} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy(), { timeout: 16000 });
    await waitFor(() => expect(getByText('Round: 2')).toBeTruthy(), { timeout: 16000 });
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 21000 });
});

test('rest2, ready1, interval2', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={2} restLength={0} roundLength={5} readyLength={5} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy(), { timeout: 11000 });
    await waitFor(() => expect(getByText('Round: 2')).toBeTruthy(), { timeout: 11000 });
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 16000 });
});

test('rest1, ready2, interval2', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={2} restLength={5} roundLength={5} readyLength={0} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy());
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 16000 });
});

test('rest2, ready2, interval2', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={2} restLength={0} roundLength={5} readyLength={0} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Round Time Left: 0:04')).toBeTruthy(), { timeout: 6000 });
    await waitFor(() => expect(getByText('Round: 2')).toBeTruthy(), { timeout: 6000 });
    await waitFor(() => expect(getByText('DONE!')).toBeTruthy(), { timeout: 11000 });
});