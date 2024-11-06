import { TypeScriptProject } from 'arch-unit-ts/dist/arch-unit/core/domain/TypeScriptProject';
import { RelativePath } from 'arch-unit-ts/dist/arch-unit/core/domain/RelativePath';
import { classes, noClasses } from 'arch-unit-ts/dist/main';
import { Architectures } from 'arch-unit-ts/dist/arch-unit/library/Architectures';
import { SharedKernel } from './SharedKernel';
import { BusinessContext } from './BusinessContext';

describe('HexagonalArchTest', () => {
  const ignoredFiles = ['**/*module.ts', '**/main.ts'];

  const srcProject = new TypeScriptProject(
    RelativePath.of('src'),
    ...ignoredFiles,
  );

  const sharedKernels = packagesWithContext(SharedKernel.name);
  const businessContexts = packagesWithContext(BusinessContext.name);

  // function otherBusinessContextsDomains(context: string): string[] {
  //   return businessContexts
  //     .filter((other) => context !== other)
  //     .map((name) => name + '.domain..');
  // }

  function packagesWithContext(contextName: string): string[] {
    return srcProject
      .filterClasses('**/package-info.ts')
      .filter((typeScriptClass) => typeScriptClass.hasImport(contextName))
      .map((typeScriptClass) => typeScriptClass.packagePath.getDotsPath());
  }

  describe('BoundedContexts', () => {
    // todo need task have domain/app/infra
    // it.each([...sharedKernels, ...businessContexts])(
    //   'Should %s not depend on other bounded context domains',
    //   (context) => {
    //     noClasses()
    //       .that()
    //       .resideInAnyPackage(context + '..')
    //       .should()
    //       .dependOnClassesThat()
    //       .resideInAnyPackage(...otherBusinessContextsDomains(context))
    //       .because(
    //         'Contexts can only depend on classes in the same context or shared kernels',
    //       )
    //       .check(srcProject.allClasses());
    //   },
    // );
    // TODO sur HM not Typescript but internal and file with prefix InternalAdapter.ts
    //   it('primary TypeScript Adapters should only be called from secondaries', () => {
    //     classes()
    //       .that()
    //       .resideInAPackage('..primary..')
    //       .and()
    //       .haveSimpleNameStartingWith('TypeScript')
    //       .should()
    //       .onlyHaveDependentClassesThat()
    //       .resideInAPackage('..secondary..')
    //       .because(
    //         "To interact between two contexts, secondary from context 'A' should call a primary TypeScript adapter (naming convention starting with 'TypeScript') from context 'B'",
    //       )
    //       .check(srcProject.allClasses());
    //   });
  });

  describe('Domain', () => {
    it('Should not depend on outside', () => {
      classes()
        .that()
        .resideInAPackage('..domain..')
        .should()
        .onlyDependOnClassesThat()
        .resideInAnyPackage(
          '..domain..',
          'node_modules.@nestjs.common..',
          ...sharedKernels,
        )
        .because(
          'Domain model should only depend on domains and a very limited set of external dependencies',
        )
        .check(srcProject.allClasses());
    });

    it.each([...sharedKernels, ...businessContexts])(
      'should be an hexagonal architecture in context %s',
      (context) => {
        Architectures.layeredArchitecture()
          .consideringOnlyDependenciesInAnyPackage(context + '..')
          .withOptionalLayers(true)
          .layer('domain models', context + '.domain..')
          .layer('domain services', context + '.domain..')
          .layer('application services', context + '.application..')
          .layer('primary adapters', context + '.infrastructure.primary..')
          .layer('secondary adapters', context + '.infrastructure.secondary..')
          // It's important to ignore .module.ts files
          .whereLayer('application services')
          .mayOnlyBeAccessedByLayers('primary adapters')
          .whereLayer('primary adapters')
          /**
           * ⚠️ Was .mayNotBeAccessedByAnyLayer() but I want to allow using primary dto in application)
           */
          .mayOnlyBeAccessedByLayers('application services')
          .whereLayer('secondary adapters')
          .mayNotBeAccessedByAnyLayer()
          .because(
            'Each bounded context should implement an hexagonal architecture',
          )
          .check(srcProject.allClasses());
      },
    );
  });

  /**
   * ⚠️ Was '..infrastructure..' but I check only secondary (allow using primary dto in application)
   */
  describe('Application', () => {
    it('Should not depend on secondary', () => {
      noClasses()
        .that()
        .resideInAPackage('..application..')
        .should()
        .dependOnClassesThat()
        .resideInAnyPackage('..secondary..')
        .because(
          'Application should only depend on domain, not on infrastructure',
        )
        .check(srcProject.allClasses());
    });
  });

  describe('Primary', () => {
    it('Should not depend on secondary', () => {
      noClasses()
        .that()
        .resideInAPackage('..primary..')
        .should()
        .dependOnClassesThat()
        .resideInAnyPackage('..secondary..')
        .because('Primary should not interact with secondary')
        .check(srcProject.allClasses());
    });
  });

  describe('Secondary', () => {
    // Not in arch-unit-ts and normally unnecessary if domain isolated and controllers use application
    it('Should not depend on primary', () => {
      noClasses()
        .that()
        .resideInAPackage('..secondary..')
        .should()
        .dependOnClassesThat()
        .resideInAnyPackage('..primary..')
        .because('Secondary should not interact with primary')
        .check(srcProject.allClasses());
    });

    it('should not depend on application', () => {
      noClasses()
        .that()
        .resideInAPackage('..infrastructure.secondary..')
        .should()
        .dependOnClassesThat()
        .resideInAPackage('..application..')
        .because('Secondary should not depend on application')
        .check(srcProject.allClasses());
    });

    // it.each([...sharedKernels, ...businessContexts])(
    //   'should %s not depend on same context primary',
    //   (context) => {
    //     noClasses()
    //       .that()
    //       .resideInAPackage(context + '.infrastructure.secondary..')
    //       .should()
    //       .onlyDependOnClassesThat()
    //       .resideInAPackage(context + '.infrastructure.primary..')
    //       .because("Secondary should not loop to its own context's primary")
    //       .check(srcProject.allClasses());
    //   },
    // );
  });
});
