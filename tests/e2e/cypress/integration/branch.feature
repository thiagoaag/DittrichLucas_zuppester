Feature: Branch

  Create and list branch, create and commit a file at new branch

  Background: Login
    Given I logged with:
      | user | password |
      |      |          |

  Scenario Outline: Create a branch
    When I type '<repo>' in the search input
    Then I should see the '<repo>' repository link
    When I click in the '<repo>' link
    Then I should be redirect to '<repo>' repository page
    When I click in the branch button
    And I type '<branch>' in the input text
    Then I should see a button that contains the text 'Create branch:'
    When I click in the create branch button
    Then I should see a banner at the top margin with the message 'Branch created.'
    And I should see the button to switch branches with the '<branch>' selected
    Examples:
      | repo | branch |
      |      |        |

  Scenario Outline: List branches
    When I type '<repo>' in the search input
    Then I should see the '<repo>' repository link
    When I click in the '<repo>' link
    Then I should be redirect to '<repo>' repository page
    And I should see the branch link
    When I click in the branch link
    And I click in all branches
    Then I should see a table that contains the '<branch>'
    Examples:
      | repo | branch |
      |      |        |

  Scenario Outline: Create and commit a file at new branch
    When I type '<repo>' in the search input
    Then I should see the '<repo>' repository link
    When I click in the '<repo>' link
    Then I should be redirect to '<repo>' repository page
    When I access the '<branch>' branch page
    Then I should see the '<branch>' branch link
    And I should see the button to switch branches with the '<branch>' selected
    Then I should see the button with the text 'Create new file'
    When I click on the 'Create new file' button
    Then I should be redirected to the page for creating the new file in the '<branch>'
    Then I should see the field to type the file name
    And I should see the button to commit the disabled file
    When I type '<file>' in the file name field
    Then I should see the button to commit the abled file
    When I click the button to commit the file
    Then I should be redirected to the main '<repo>' page
    And I should see '<file>' in the file list
    Examples:
      | repo | branch | file |
      |      |        |      |
