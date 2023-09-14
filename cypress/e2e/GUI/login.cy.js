/// <reference types="Cypress" />

const perfil = require('../../fixtures/perfil.json');

import HomePage from '../../support/pages/home';
import MinhaConta from '../../support/pages/home/minhaConta';

// Neste caso também podemos deixar as configurações em um arquivo Cypress.env.json

//Bloco de funcionalidades
context('Funcionalidade Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve fazer login com sucessso - Usando arquivo de dados ', () => {
    HomePage.acessarPaginaMinhaConta();
    cy.login(perfil.usuarioEbac, perfil.senhaEbac);
    MinhaConta.clicarBotaoLogin();
    MinhaConta.validarUrlVisivel(perfil.baseUrl + perfil.uri.minhaConta);
    MinhaConta.validarMenuMinhaContaVisivel();
  });

  it('Deve fazer login com sucessso - Usando cypress.env.json', () => {
    HomePage.acessarPaginaMinhaConta();
    cy.login(Cypress.config('usuarioEbac'), Cypress.config('senhaEbac'));
    MinhaConta.clicarBotaoLogin();
    MinhaConta.validarUrlVisivel(perfil.baseUrl + perfil.uri.minhaConta);
    MinhaConta.validarMenuMinhaContaVisivel();
  });

  it('Deve fazer login com sucessso - Usando fixture', () => {
    cy.fixture('perfil').then(dados => {
      HomePage.acessarPaginaMinhaConta();
      cy.login(Cypress.config('usuarioEbac'), Cypress.config('senhaEbac'));
      MinhaConta.clicarBotaoLogin();
      MinhaConta.validarUrlVisivel(perfil.baseUrl + perfil.uri.minhaConta);
      MinhaConta.validarMenuMinhaContaVisivel();
    });
  });

  it('Deve exibir uma mensagem de erro ao insserir um usuário inválido', () => {
    HomePage.acessarPaginaMinhaConta();
    cy.login('a@a.com', 'teste@teste.com', { log: false });
    MinhaConta.clicarBotaoLogin();
    MinhaConta.validarMensagemErroLogin();
  });

  it('Deve exibir uma mensagem de erro ao insserir senha inválida', () => {
    HomePage.acessarPaginaMinhaConta();
    cy.login('aluno_ebac@teste.com', 'senhaInvalida', { log: false });
    MinhaConta.clicarBotaoLogin();
    MinhaConta.validarMensagemErroLogin();

  });
});
