/// <reference types="cypress" />


import produtosPage from "../support/page_objects/produtos.page";
import { faker } from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('/produtos')
    });

    
    it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados =>{
     
         produtosPage.buscarProduto(dados[0].nomeProduto)
         produtosPage.addProdutoCarrinho(
             dados[0].tamanho,
              dados[0].cor,
               dados[0].quantidade)
         cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
         produtosPage.buscarProduto(dados[2].nomeProduto)
         produtosPage.addProdutoCarrinho(
             dados[2].tamanho,
              dados[2].cor,
               dados[2].quantidade)
         cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
         produtosPage.buscarProduto(dados[1].nomeProduto)
         produtosPage.addProdutoCarrinho(
             dados[1].tamanho,
              dados[1].cor,
               dados[1].quantidade)
         cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
         produtosPage.buscarProduto(dados[3].nomeProduto)
         produtosPage.addProdutoCarrinho(
             dados[3].tamanho,
              dados[3].cor,
               dados[3].quantidade)
         cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
         
         cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
         cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.checkout(faker.person.firstName(), faker.person.lastName() , faker.location.street() , faker.location.city() , 89000000 , 999123456 , faker.internet.email())
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        
        
        
        
        })
    });
        


})
