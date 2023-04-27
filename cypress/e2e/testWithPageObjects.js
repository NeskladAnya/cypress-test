import { navigateTo } from "../support/page_objects/navigationPage"

describe('Test with Page Objects', () => {

  beforeEach('open application', () => {
    cy.visit('/')
  })

  it('verifies navigation across pages', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datepickerPage()
    navigateTo.smartTablePage()
    navigateTo.toasterPage()
    navigateTo.tooltipPage()
  })
})
