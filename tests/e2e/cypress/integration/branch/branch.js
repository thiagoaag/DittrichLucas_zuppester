///<reference types='Cypress' />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { USER, REPO } from '../../../../support/hooks.js'

Given('I logged with:', ({ rawTable }) => {
    const [, ...users] = rawTable

    for (const [user, password] of users) {
        cy.login(user, password)
    }
})

When('I type {string} in the search input', repo => {
    cy.get('input[id="dashboard-repos-filter-left"]').clear().type(repo)
})

When('I click in the {string} link', repo => {
    cy.contains(repo).click()
})

When('I click in the branch link', () => {
    cy.contains('branch').click()
})

When('I click in all branches', () => {
    cy.contains('All branches').click()
})

When('I click in the branch button', () => {
    cy.get('summary[title="Switch branches or tags"]').click()
})

When('I type {string} in the input text', branch => {
    cy.get('input[id="context-commitish-filter-field"]').clear().type(branch)
})

When('I click in the create branch button', () => {
    cy.get('form[data-filter-new-item="true"] > button').click()
})

When('I access the {string} branch page', branch => {
    cy.visit(`/${USER}/${REPO}/tree/${branch}`)
})

When('I click on the {string} button', () => {
    cy.get('button[data-disable-with="Creating file…"]').click()
})

When('I type {string} in the file name field', fileName => {
    cy.get('input[name="filename"]').type(fileName)
})

When('I click the button to commit the file', () => {
    cy.get('button[id="submit-file"]').click()
})

Then('I should see the {string} repository link', repo => {
    cy.get(`a[href="/${USER}/${repo}"]`).should(($span) => {
        expect($span).to.exist
        expect($span.eq(1), 'first span').to.contain(repo)
    })
})

Then('I should be redirect to {string} repository page', repo => {
    cy.url().should('contain', repo)
})

Then('I should see the branch link', () => {
    cy.get('ul[class="numbers-summary"] > li:nth(1) > a')
    .should('contain', 'branch')
})

Then('I should see the {string} branch link', branch => {
    cy.url().should('contain', branch)
})

Then('I should see a table that contains the {string}', branch => {
    cy.get('div[class="Box mb-3"] > ul')
    .should('contain', branch)
})

Then('I should see a button that contains the text {string}', text => {
    cy.get('form[data-filter-new-item="true"] > button > div > span:nth(0)')
    .should('contain', text)
})

Then('I should see a banner at the top margin with the message {string}', message => {
    cy.get('div[id="js-flash-container"] > div').should('contain', message)
})

Then('I should see the button to switch branches with the {string} selected', branch => {
    cy.get('summary[title="Switch branches or tags"] > span:nth(0)')
    .should('contain', branch)
})

Then('I should be redirected to the {string} repository page', repo => {
    cy.url().should('contain', repo)
})

Then('I should see the branch link', () => {
    cy.get('ul[class="numbers-summary"] > li:nth(1) > a')
    .should('contain', 'branch')
})

Then('I should see the button with the text {string}', text => {
    cy.get('button[data-disable-with="Creating file…"]').should('contain', text)
})

Then('I should be redirected to the page for creating the new file in the {string}', branch => {
    cy.url().should('contain', branch)
})

Then('I should see the field to type the file name', () => {
    cy.get('input[name="filename"]').should('exist')
})

Then('I should see the button to commit the disabled file', () => {
    cy.get('button[id="submit-file"]').should('have.attr', 'disabled')
})

Then('I should see the button to commit the abled file', () => {
    cy.get('button[id="submit-file"]').should('not.have.attr', 'disabled')
})

Then('I should be redirected to the main {string} page', repo => {
    cy.url().should('contain', repo)
})

Then('I should see {string} in the file list', fileName => {
    cy.contains(fileName).should('contain', fileName)
})
