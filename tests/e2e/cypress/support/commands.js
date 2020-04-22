import { USER, REPO } from '../../../support/hooks.js'

Cypress.Commands.add('login', (user, password) => {
    cy.visit('/login')
    cy.get('input[id="login_field"]').clear().type(user)
    cy.get('input[id="password"]').clear().type(password)
    cy.get('input[name="commit"]').click()
 })

Cypress.Commands.add('removeBranch', () => {
    cy.visit(`${USER}/${REPO}/branches/yours`)
    cy.get(`form[action="/${USER}/${REPO}/branches/new-branch"] > button[title="Delete this branch"]`).click()
    cy.visit(`${USER}/${REPO}`)
})
