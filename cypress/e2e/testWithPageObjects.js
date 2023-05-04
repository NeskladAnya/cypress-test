import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
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

  it.only('should submit Inline and Basic forms and select tomorrow date in calendar', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Hanna', 'test@test.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password123')
    navigateTo.datepickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(1)
    onDatepickerPage.selectDatepickerWithRangeFromToday(2, 10)
  })
})
