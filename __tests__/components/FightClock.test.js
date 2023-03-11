import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FightClock from '../../src/components/FightClock';

// ignore useNativeDriver warning
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('renders without crashing', () => {
    render(<FightClock />);
});

test('pressing start button starts timer', async () => {
    const { getByTestId, getByText } = render(<FightClock intervals={3} restLength={30} roundLength={180} readyLength={30} />);
    const startButton = getByTestId('start-button');

    fireEvent.press(startButton);
    await waitFor(() => expect(getByText('Ready Time Left: 0:29')).toBeTruthy());
});
