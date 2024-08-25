describe('promises-and-chains-solution', () => {
  beforeEach(() => {
    cy.visit(baseUrl + "/main.html");
  })

  it('should show loading text initially', () => {
    cy.get("#output").find("tr:first-child").find("td").invoke("text").then(text => {
      expect(text.trim()).equal("Loading...");
    });
  })

  it('should show promises and total time after 4 seconds', () => {
    cy.wait(4000);
    cy.get("#output").find("tr").then(rows => {
      expect(rows.length).equal(4);
    });
    cy.get("#output > tr > td:nth-child(1)").each(($elm, index, $list) => {
      const t = $elm.text();
      if (t.includes("Promise 1")) {
        cy.get("#output > tr > td:nth-child(1)").eq(index).next().then(function (d) {
          const r = parseFloat(d.text());
          cy.wrap(r).should("be.gte", 1);
          cy.wrap(r).should("be.lte", 3);
        });
      }
      if (t.includes("Promise 2")) {
        cy.get("#output > tr > td:nth-child(1)").eq(index).next().then(function (d) {
          const r = parseFloat(d.text());
          cy.wrap(r).should("be.gte", 1);
          cy.wrap(r).should("be.lte", 3);
        });
      }
      if (t.includes("Promise 3")) {
        cy.get("#output > tr > td:nth-child(1)").eq(index).next().then(function (d) {
          const r = parseFloat(d.text());
          cy.wrap(r).should("be.gte", 1);
          cy.wrap(r).should("be.lte", 3);
        });
      }
      if (t.includes("Total")) {
        cy.get("#output > tr > td:nth-child(1)").eq(index).next().then(function (d) {
          const r = parseFloat(d.text());
          cy.wrap(r).should("be.gte", 2);
          cy.wrap(r).should("be.lte", 4);
        });
      }
    });
  })
})