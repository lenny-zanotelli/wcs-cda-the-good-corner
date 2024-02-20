import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SearchBar from '../components/SearchBar';

jest.mock('next/navigation');

describe('Search Bar', () => {
  it('Should be able to search and display ads when an input is entered by an user', () => {
    // Arrange
    const mockPush = jest.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    const { getByLabelText, getByRole } = render(<SearchBar />);
    const input = getByLabelText('search-input');
    const searchButton = getByRole('button');

    // Act
    fireEvent.change(input, { target: { value: 'car' } });
    fireEvent.click(searchButton);

    // Assert
    expect(input).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/ad/search/car');
  });
});
