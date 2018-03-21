//-----------------------------------------------------------------------
// <copyright file = "test-message-types.js">
// Copyright (c) 2018 Me!. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('MessageTypes tests', () => {
    var MessageTypes = require('../message-types');

    it('should be an object', (done) => {
        expect(MessageTypes).to.be.an('object');
        done();
    });

    it('should be frozen', (done) => {
        // change a property
        expect(() => {
            MessageTypes[0] = {}
        }).to.throw('Cannot add property 0, object is not extensible');
        // add a property
        expect(() => {
            MessageTypes['NonexistentMessageType'] = {}
        }).to.throw('Cannot add property NonexistentMessageType, object is not extensible');
        done();
    });

    it('should have twleve properties', (done) => {
        // this test should be updated as keys are added to the object
        // this will help ensure that if the object is changed, the tests will at least get looked at
        expect(Object.keys(MessageTypes).length).to.equal(8);
        done();
    });

    it('should have a None property', (done) => {
        expect(MessageTypes.None).to.not.be.undefined;
        expect(MessageTypes.None).to.be.empty;
        done();
    });

    it('should have a Help property', (done) => {
        expect(MessageTypes.Help).to.not.be.undefined;
        expect(MessageTypes.Help).to.have.property('respond');
        expect(MessageTypes.Help.respond).to.be.a('function');
        done();
    });

    it('should have a Ping property', (done) => {
        expect(MessageTypes.Ping).to.not.be.undefined;
        expect(MessageTypes.Ping).to.have.property('respond');
        expect(MessageTypes.Ping.respond).to.be.a('function');
        done();
    });

    it('should have a Hug property', (done) => {
        expect(MessageTypes.Hug).to.not.be.undefined;
        expect(MessageTypes.Hug).to.have.property('respond');
        expect(MessageTypes.Hug.respond).to.be.a('function');
        done();
    });

    it('should have a Kiss property', (done) => {
        expect(MessageTypes.Kiss).to.not.be.undefined;
        expect(MessageTypes.Kiss).to.have.property('respond');
        expect(MessageTypes.Kiss.respond).to.be.a('function');
        done();
    });

    it('should have a Slap property', (done) => {
        expect(MessageTypes.Slap).to.not.be.undefined;
        expect(MessageTypes.Slap).to.have.property('respond');
        expect(MessageTypes.Slap.respond).to.be.a('function');
        done();
    });

    it('should have a Poke property', (done) => {
        expect(MessageTypes.Poke).to.not.be.undefined;
        expect(MessageTypes.Poke).to.have.property('respond');
        expect(MessageTypes.Poke.respond).to.be.a('function');
        done();
    });

    it('should have a Anime property', (done) => {
        expect(MessageTypes.Anime).to.not.be.undefined;
        expect(MessageTypes.Anime).to.have.property('respond');
        expect(MessageTypes.Anime.respond).to.be.a('function');
        done();
    });
});