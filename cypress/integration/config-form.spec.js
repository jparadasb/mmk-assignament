describe('Config form screen', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Error message if the time is not enough', () => {
    cy.get('.custom-button_submit').click();

    cy.get('.error-message');
    cy.contains('The duration should be at least one minute');
  });

  it('Should have 3 options, 1, 2 and 5 min', () => {
    cy.get('.custom-input_number').click();

    cy.get('#duration option').should('have.length', 3)
        .first().should('have.value', '1')
        .next().should('have.value', '2')
        .next().should('have.value', '5');
  });
});
