"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('Essai', () => {
    it('test', () => __awaiter(void 0, void 0, void 0, function* () {
        const repositoryMock = {
            createQueryBuilder: jest.fn(),
        };
        // Définissez ce que la méthode createQueryBuilder doit retourner
        repositoryMock.createQueryBuilder.mockImplementation(() => ({
            leftJoinAndSelect: jest.fn(() => ({
                leftJoinAndSelect: jest.fn(() => ({
                    andWhere: jest.fn(() => ({
                        getMany: jest.fn(() => ['data1', 'data2']),
                    })),
                })),
            })),
        }));
        // Appelez la requête de base de données et vérifiez que le résultat attendu est retourné
        const estabs = yield repositoryMock.createQueryBuilder("etablishment")
            .leftJoinAndSelect("etablishment.year", "year")
            .leftJoinAndSelect("etablishment.teacher_ets", "teacher_ets")
            .andWhere("teacher_ets.role = :role", { role: "director" })
            .getMany();
        expect(estabs).toEqual(['data1', 'data2']);
    }));
});
