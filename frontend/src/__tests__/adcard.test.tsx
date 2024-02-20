import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AdCard from '../components/AdCard';

describe('AdCard', () => {
  it('Should render the component AdCard when AdCard is called', () => {
    render(
      // Arrange
      <AdCard
        category={{ id: '1', name: 'informatique' }}
        description="this machin is cool"
        picture="photo"
        location="Paris"
        owner="email"
        price={250}
        title="TRes beau titre"
        id="qfqfq"
        key={1}
        tags={[]}
        createdAt=""
        updatedAt=""
      />,
    );
    // Act
    const title = screen.getByText(/sell my car/i);
    // Assert
    expect(title).toBeInTheDocument();
  });
});
