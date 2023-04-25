/// <reference types="cypress" />

describe('First suite', () => {

  it('first test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //by Tag Name
    cy.get('input')

    //by ID -> put # before ID
    cy.get('#inputEmail1')

    //by Class Name -> put . before class
    cy.get('.input-full-width')

    //by Attribute Name -> put atrribute within []
    cy.get('[placeholder]')

    //by Attribute Name and Value
    cy.get('[placeholder="Email"]')

    //by Class Value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag Name and Attribute with Value
    cy.get('input[placeholder="Email"]')

    //by Two Different Attributes
    cy.get('[placeholder="Email"][fullwidth]')

    //by Tag Name, Attribute with Value, ID and Class Name
    cy.get('input[type="email"]#inputEmail1.input-full-width')

    //the most recommended way by Cypress -> create your own locator
    cy.get('[data-cy="imputEmail1"]')
  })

  it('second test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('#inputEmail3')
          .parents('form')
          .should('contain', 'Sign in')
          .find('nb-checkbox')
          .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
    
  })

  it('then and wrap method', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    //cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()

      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()

        expect(passwordLabelFirst).to.equal(passwordLabelSecond)

        cy.wrap(secondForm).find('[for="exampleInputPassword1"]') //back to cypress context not jquery
      })
    })
  })

  it('invoke command', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[for="inputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
  })

  it('assert property', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('12').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 12, 2023')
      })
  })

  it('radio buttons', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({force: true})
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({force: true})

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })
  })

  it('checkboxes', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // the "check" method only checks, if it's already checked -> nothing will happen
    cy.get('[type="checkbox"]').check({force: true})

    cy.get('[type="checkbox"]').eq(1).click({force: true})
    // cy.get('[type="checkbox"]').click({force: true}) -> won't work since cy.click() can only be called on a single element
  })

  it('assert propery 2.0', () => {

    function selectDayFromCurrent(day) {
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('default', {month: 'short'})
      let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`

      cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then(dateAttribtue => {
          if(!dateAttribtue.includes(futureMonth)){
            cy.get('[data-name="chevron-right"]').click()
            selectDayFromCurrent(day)
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
          }
        })
      
      return dateAssert
    }

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateAssert = selectDayFromCurrent(30)

      cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    })

  })

  it('lists and dropdowns', () => {

    cy.visit('/')

    //1
    //cy.get('nav nb-select').click()
    //cy.get('.options-list').contains('Dark').click()
    //cy.get('nav nb-select').should('contain', 'Dark')
    //cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    
    //2
    cy.get('nav nb-select').then(dropDown => {
      cy.wrap(dropDown).click()
      cy.get('.options-list nb-option').each( (listItem, index) => {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropDown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
        
        if( index < 3){
          cy.wrap(dropDown).click()
        }
      })
    })
  })

  it('tables', () => {

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //update an existing value
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()

      cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
    })

    //add a new value
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Hanna')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Saldatkina')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(tableColumns => {
      cy.wrap(tableColumns).eq(2).should('contain', 'Hanna')
      cy.wrap(tableColumns).eq(3).should('contain', 'Saldatkina')
    })

    //search
    const ages = [20, 30, 40, 150]

    cy.wrap(ages).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(tableRow => {
        if(age >= 150) {
          cy.wrap(tableRow).should('contain', 'No data found')
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
      })
    })
  })

  it.only('tooltips', () => {

    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()

    cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
  })
})
