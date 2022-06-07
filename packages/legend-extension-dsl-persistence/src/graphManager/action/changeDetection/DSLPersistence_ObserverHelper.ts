/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { Persistence } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_Persistence';
import {
  observe_Abstract_PackageableElement,
  observe_PackageableElementReference,
  skipObserved,
  skipObservedWithContext,
  observe_EmbeddedData,
  type ObserverContext,
} from '@finos/legend-graph';
import { makeObservable, observable, override, computed } from 'mobx';
import type { PersistenceTest } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_PersistenceTest';
import type { ConnectionTestData } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_ConnectionTestData';
import type { ParameterValue } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_ParameterValue';
import type { PersistenceTestSuite } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_PersistenceTestSuite';
import type { TestData } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_PersistenceTestData';
import {
  observe_AtomicTest,
  observe_TestAssertion,
} from './DSLPersistence_Testable_ObserverHelper';

export const observe_Persistence = skipObservedWithContext(
  (metamodel: Persistence, context): Persistence => {
    observe_Abstract_PackageableElement(metamodel);

    makeObservable<Persistence, '_elementHashCode'>(metamodel, {
      documentation: observable,
      trigger: observable,
      service: observable,
      persister: observable,
      notifier: observable,
      testSuites: observable,
      _elementHashCode: override,
    });

    metamodel.testSuites.forEach((test) =>
      observe_PersistenceTestSuite(test, context),
    );

    return metamodel;
  },
);

export const observe_ConnectionTestData = skipObservedWithContext(
  (
    metamodel: ConnectionTestData,
    context: ObserverContext,
  ): ConnectionTestData => {
    makeObservable(metamodel, {
      connectionId: observable,
      testData: observable,
      hashCode: computed,
    });

    observe_EmbeddedData(metamodel.testData, context);

    return metamodel;
  },
);

export const observe_ParameterValue = skipObserved(
  (metamodel: ParameterValue): ParameterValue => {
    makeObservable(metamodel, {
      name: observable,
      value: observable,
      hashCode: computed,
    });

    return metamodel;
  },
);

export const observe_TestData = skipObservedWithContext(
  (metamodel: TestData, context: ObserverContext): TestData => {
    makeObservable(metamodel, {
      connectionsTestData: observable,
      hashCode: computed,
    });

    metamodel.connectionsTestData.forEach((connectionTestData) =>
      observe_ConnectionTestData(connectionTestData, context),
    );

    return metamodel;
  },
);

export const observe_PersistenceTest = skipObservedWithContext(
  (metamodel: PersistenceTest, context: ObserverContext): PersistenceTest => {
    makeObservable(metamodel, {
      id: observable,
      testData: observable,
      assertions: observable,
      parameters: observable,
      hashCode: computed,
    });

    observe_TestData(metamodel.testData, context);
    metamodel.parameters.forEach(observe_ParameterValue);
    metamodel.assertions.forEach(observe_TestAssertion);

    return metamodel;
  },
);

export const observe_PersistenceTestSuite = skipObservedWithContext(
  (
    metamodel: PersistenceTestSuite,
    context: ObserverContext,
  ): PersistenceTestSuite => {
    makeObservable(metamodel, {
      id: observable,
      tests: observable,
      hashCode: computed,
    });

    metamodel.tests.forEach((test) => {
      observe_AtomicTest(test, context);
    });

    return metamodel;
  },
);
