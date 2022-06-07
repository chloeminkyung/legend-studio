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

import { computed, makeObservable, observable } from 'mobx';
import { PersistenceTest } from '../../../DSLPersistence_Exports';
import { PersistenceTestSuite } from '../../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_PersistenceTestSuite';
import { EqualTo } from '../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualTo';
import { EqualToJson } from '../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualToJson';
import {
  EqualToTDS,
  type RelationalTDS,
} from '../../../../../legend-graph/src/models/metamodels/pure/test/assertion/EqualToTDS';
import type { TestAssertion } from '../../../../../legend-graph/src/models/metamodels/pure/test/assertion/TestAssertion';
import type {
  AtomicTest,
  TestSuite,
} from '../../../../../legend-graph/src/models/metamodels/pure/test/Test';
import { type ObserverContext, skipObserved } from '@finos/legend-graph';
import {
  observe_ExternalFormatData,
  observe_RelationalDataTableColumn,
  observe_RelationalDataTableRow,
} from '../../../../../legend-graph/src/graphManager/action/changeDetection/DSLData_ObserverHelper';
import {
  observe_PersistenceTest,
  observe_PersistenceTestSuite,
} from './DSLPersistence_ObserverHelper';

const observe_EqualTo = skipObserved((metamodel: EqualTo): EqualTo => {
  makeObservable(metamodel, {
    id: observable,
    expected: observable,
    hashCode: computed,
  });

  return metamodel;
});

const observe_RelationalTDS = skipObserved(
  (metamodel: RelationalTDS): RelationalTDS => {
    makeObservable(metamodel, {
      rows: observable,
      columns: observable,
      hashCode: computed,
    });
    metamodel.columns.forEach(observe_RelationalDataTableColumn);
    metamodel.rows.forEach(observe_RelationalDataTableRow);
    return metamodel;
  },
);

const observe_EqualToTDS = skipObserved((metamodel: EqualToTDS): EqualToTDS => {
  makeObservable(metamodel, {
    id: observable,
    expected: observable,
    hashCode: computed,
  });
  observe_RelationalTDS(metamodel.expected);
  return metamodel;
});

const observe_EqualToJson = skipObserved(
  (metamodel: EqualToJson): EqualToJson => {
    makeObservable(metamodel, {
      id: observable,
      expected: observable,
      hashCode: computed,
    });

    observe_ExternalFormatData(metamodel.expected);

    return metamodel;
  },
);

export function observe_AtomicTest(
  metamodel: AtomicTest,
  context: ObserverContext,
): AtomicTest {
  if (metamodel instanceof PersistenceTest) {
    return observe_PersistenceTest(metamodel, context);
  }
  return metamodel;
}

export function observe_TestAssertion(metamodel: TestAssertion): TestAssertion {
  if (metamodel instanceof EqualTo) {
    return observe_EqualTo(metamodel);
  } else if (metamodel instanceof EqualToJson) {
    return observe_EqualToJson(metamodel);
  } else if (metamodel instanceof EqualToTDS) {
    return observe_EqualToTDS(metamodel);
  }
  return metamodel;
}

export function observe_TestSuite(
  metamodel: TestSuite,
  context: ObserverContext,
): TestSuite {
  if (metamodel instanceof PersistenceTestSuite) {
    return observe_PersistenceTestSuite(metamodel, context);
  }
  return metamodel;
}
