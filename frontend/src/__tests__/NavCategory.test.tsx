import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NavCategory from '../components/NavCategory';

describe('NavCategory', () => {
  it('Should render NavCategory component when its called', () => {
    render(
      // Arrange
      <NavCategory
        id="dqd1"
        name="Voiture"
      />,
    );
    // Act
    const name = screen.getByText(/Voiture/i);
    // Assert
    expect(name).toBeInTheDocument();
  });
});
