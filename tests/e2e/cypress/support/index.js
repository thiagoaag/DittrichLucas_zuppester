import './commands'

after(() => {
    cy.removeBranch()
})
