describe('Typing test screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.custom-input_number').type('1');
    cy.get('.custom-button_submit').click();
  });

  it('The input text should be focused', () => {
    cy.get('.cy-control_input-typing-test').focused();
  });

  it('Should show last word typed in red if is wrong', () => {
    cy.get('.cy-control_input-typing-test').type('hello ');
    cy.get('.text-reference_container span:first')
        .should('have.class', 'errored');
  });

  it('Should show last word typed in green if is right', () => {
    cy.get('.word-active')
        .invoke('text')
        .invoke('replace', /\u00a0/g, ' ')
        .then((word) => {
          cy.get('.cy-control_input-typing-test').type(word);
          cy.get('.text-reference_container span:first')
              .should('have.class', 'correct');
        });
  });

  it(
      `The score should be equal to the amount 
      words in the reference text after complete 1m test`,
      () => {
        cy.get('.text-reference_container')
            .invoke('text')
            .invoke('replace', /\u00a0/g, ' ')
            .then((text) => {
              console.log(text.split(' '));
              const length = text.split(' ').length;
              cy.get('.cy-control_input-typing-test').type(text, {force: true});
              cy.get('.score').contains(length - 1);
            });
      });
});
